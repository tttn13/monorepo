use std::env;
use std::sync::Arc;
use axum::extract::FromRef;
use axum::Router;
use axum_extra::headers::authorization::Basic;
use diesel::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use dotenvy::dotenv;
use oauth2::basic::BasicClient;
use oauth2::{AuthUrl, ClientId, ClientSecret, RedirectUrl, TokenUrl};
use oauth2::url::Url;
use tower_http::trace;
use tower_http::trace::TraceLayer;
use tracing::Level;
use tracing::log::info;

pub mod v1;

pub mod schema;
pub mod models;

pub type DbPool = Pool<ConnectionManager<PgConnection>>;
pub type OAuthClient = Arc<BasicClient>;

#[derive(Clone)]
pub struct AppState {
    database: Pool<ConnectionManager<PgConnection>>,
    oauth: OAuthClient,

    auth_config: AuthenticationConfig,
}

#[derive(Clone)]
pub struct AuthenticationConfig {
    signature_key: String,

    // This is here due to OAuth2 crate encoding the redirect_uri
    redirect_url: String
}

impl FromRef<AppState> for AuthenticationConfig {
    fn from_ref(input: &AppState) -> Self {
        input.auth_config.clone()
    }
}

impl FromRef<AppState> for Pool<ConnectionManager<PgConnection>>{
    fn from_ref(input: &AppState) -> Self {
        input.database.clone()
    }
}

impl FromRef<AppState> for Arc<BasicClient> {
    fn from_ref(input: &AppState) -> Self {
        input.oauth.clone()
    }
}

fn appstate_from_env() -> AppState {
    dotenv().ok()   ;

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);


    let oauth = Arc::new(BasicClient::new(
        ClientId::new(env::var("OAUTH_CLIENT_ID").expect("OAUTH_CLIENT_ID must be set")),
        Some(ClientSecret::new(env::var("OAUTH_CLIENT_SECRET").expect("OAUTH_CLIENT_SECRET must be set"))),
        AuthUrl::new(env::var("OAUTH_AUTH_URL").expect("OAUTH_AUTH_URL must be set")).expect("Invalid OAUTH_AUTH_URL"),
        Some(TokenUrl::new(env::var("OAUTH_TOKEN_URL").expect("OAUTH_TOKEN_URL must be set")).expect("Invalid OAUTH_TOKEN_URL")),
    ));

    let signature_key = env::var("AUTH_PRIVATE_KEY").expect("AUTH_PRIVATE_KEY must be set");
    let redirect_url = env::var("OAUTH_REDIRECT_URL").expect("OAUTH_REDIRECT_URL must be set");

    AppState {
        database: Pool::builder().test_on_check_out(true).build(manager).expect("Failed to create pool."),
        oauth,
        auth_config: AuthenticationConfig {
            signature_key, redirect_url
        }
    }
}

pub fn application_router() -> Router {
    let app_state = appstate_from_env();

    Router::new()
        .nest("/v1", v1::api_routes())
        .with_state(app_state.clone())
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().level(Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO))
        )
}