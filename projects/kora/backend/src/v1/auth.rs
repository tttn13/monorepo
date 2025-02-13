use crate::{AppState, AuthenticationConfig, DbPool, OAuthClient};
use axum::extract::State;
use axum::routing::{get, post};
use axum::{Json, Router};
use oauth2::basic::BasicClient;
use oauth2::{CsrfToken, RedirectUrl, Scope};
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use std::sync::Arc;
use uuid::Uuid;

pub fn auth_router() -> Router<AppState> {
    Router::new()
        .route("/login", get(login))
        .route("/callback", post(callback))
        .route("/refresh", post(refresh))
}


async fn login(State(auth_config): State<AuthenticationConfig>, State(oauth): State<OAuthClient>) -> Json<Value>{
    let random = Uuid::new_v4().to_string();
    let signature = generate_signature(&random, &auth_config.signature_key);
    let state = format!("{}.{}", random, signature);

    let (auth_url, _csrf_token) = oauth
        .authorize_url(move || { CsrfToken::new(state) })
        .add_scope(Scope::new("email".to_string()))
        .url();

    tracing::info!("auth_url: {}", auth_url.as_str());
    let with_redirect = format!("{}&redirect_uri={}", auth_url.as_str(), auth_config.redirect_url);

    Json(json!({ "login_url": with_redirect }))
}

async fn callback(State(client): State<Arc<BasicClient>>, State(db_pool): State<DbPool>) {}

async fn refresh(State(client): State<Arc<BasicClient>>) {}


fn generate_signature(random_key: &str, private_key: &str) -> String {
    let combined = format!("{}.{}", random_key, private_key);
    let mut hasher = Sha256::new();

    hasher.update(combined.as_bytes());

    let result = hasher.finalize();
    format!("{:x}", result)
}