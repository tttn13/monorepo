use tower_http::trace;
use tower_http::trace::TraceLayer;
use tracing::{info_span, Level};
use backend::application_router;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(Level::INFO)
        .init();

    let app = application_router();

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();

    tracing::info!("Server is listening on port 8000");
    axum::serve(listener, app).await.unwrap();
    tracing::info!("Server is shutting down");
}