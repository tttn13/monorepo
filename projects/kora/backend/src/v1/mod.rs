mod auth;

use axum::Router;
use crate::AppState;
use crate::v1::auth::auth_router;

pub fn api_routes() -> Router<AppState> {
    Router::new()
        .nest("/auth", auth_router())
}
