import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_URL = "https://api.notion.com/v1";
const HEADERS = {
  "Authorization": `Bearer ${NOTION_API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};


async function addTask(taskName, dueDate, status) {
  try {
    const payload = {
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        "Task Name": { title: [{ text: { content: taskName } }] },
        "Due Date": dueDate ? { date: { start: dueDate } } : undefined,
        "status": { "status": { "name": "Not started" } }
      }
    };

    console.log("Sending Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(`${NOTION_API_URL}/pages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Notion API Error:", JSON.stringify(data, null, 2));
      throw new Error(`Notion API Error: ${data.message}`);
    }

    console.log("Task Added Successfully:", data);
  } catch (error) {
    console.error("Failed to add task:", error);
  }
}



addTask("Finish ", "2024-03-20", "Not started");
