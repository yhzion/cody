export async function handleNotification(result, successMessage) {
  if (result.success) {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Task Completed", { body: successMessage });
      } else {
        console.error("Notification permission was denied.");
      }
    } else if (Notification.permission === "granted") {
      new Notification("Task Completed", { body: successMessage });
    } else {
      console.error("No notification permission.");
    }
  } else {
    new Notification("Task Failed", {
      body: "An error occurred while executing the command.",
    });
  }
}
