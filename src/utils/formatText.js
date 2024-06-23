export const formatResponseText = (text) => {
  // Format bold text enclosed in **
  let formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\* \*\*(.*?):\*\*/g, "» <b>$1:</b>")
    .replace(/\* (.*?)/g, "• $1")
    .replace(/(?:\r\n|\r|\n)/g, "<br>");

  // Format code blocks enclosed in triple backticks
  formattedText = formattedText.replace(/```([\s\S]*?)```/g, (match, p1) => {
    return `<pre><code>${p1}</code></pre>`;
  });

  return formattedText;
};
