import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

app.registerExtension({
    name: "memory.cleanup",
    init() {
        api.addEventListener("memory_cleanup", ({ detail }) => {
            if (detail.type === "cleanup_request") {
                console.log("Получен запрос на очистку памяти");
                fetch("/free", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(detail.data)
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Запрос на очистку памяти отправлен");
                    } else {
                        console.error("Ошибка при отправке запроса на очистку памяти");
                    }
                })
                .catch(error => {
                    console.error("Ошибка при отправке запроса на очистку памяти:", error);
                });
            }
        });
    }
});
