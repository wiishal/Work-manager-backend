import { Context } from "hono";
import { TaskDetails } from "../constants/type";
export async function healthCheck(c: Context) {
  try {
    const externalApiUrl = c.env.NODE_PROCESS_URL;
    console.log(externalApiUrl);
    
    const apiResponse = await fetch(`${externalApiUrl}/ai/healthy`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await apiResponse.json();

    return data;
  } catch (error) {
    console.log(error, "error");
    false;
  }
}

export async function subTaskAssistance(c: Context, taskDetails: TaskDetails) {
  try {
    const externalApiUrl = c.env.NODE_PROCESS_URL;

    const apiResponse = await fetch(`${externalApiUrl}/ai/subtaskAssistance`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskDetails),    
    });
    const data = await apiResponse.json();

    return data;
  } catch (error) {
    console.log(error, "error");
    false;
  }
}


export async function calculateSpendAssistance(c: Context, spends:string[]) {
  try {
    const externalApiUrl = c.env.NODE_PROCESS_URL;

    const apiResponse = await fetch(`${externalApiUrl}/ai/calculateSpendAssistance`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({spends}),    
    });
    const data = await apiResponse.json();

    return data;
  } catch (error) {
    console.log(error, "error");
    false;
  }
}

