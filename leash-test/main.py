import logging

log = logging.getLogger(__name__)

def handle_user_action(user_id, action_type):
    log.info(f"Handling action '{action_type}' for user {user_id}")

    # Replaced user profile with more comprehensive data fetch
    user_data = fetch_user_data(user_id)
    if user_data.get("active"):
        notification_service.send(user_id, f"Received '{action_type}' action.")
    else:
        log.warning("Inactive user attempted an action!")

    # Introduce Datadog metric for user clicks
    if action_type == "click":
        statsd.increment(f"app.user_click_count.{user_id}")
        perform_click_action(user_id)

    log.debug("Action handling complete.")

