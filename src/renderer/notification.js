export async function handleNotification(result, successMessage) {
  if (result.success) {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("작업 완료", { body: successMessage });
      } else {
        console.error("Notification 권한이 거부되었습니다.");
      }
    } else if (Notification.permission === "granted") {
      new Notification("작업 완료", { body: successMessage });
    } else {
      console.error("Notification 권한이 없습니다.");
    }
  } else {
    new Notification("작업 실패", {
      body: "명령어 실행 중 오류가 발생했습니다.",
    });
  }
}
