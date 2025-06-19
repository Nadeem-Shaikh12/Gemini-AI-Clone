function fetchResult() {
    const chat = document.getElementById("textInput").value;
    AppendMessage("user", chat);
    document.getElementsByClassName("header")[0].style.display = "none";
    document.getElementById("textInput").value = "";
    fetchApiResult(chat);
  }
  
  async function fetchApiResult(chat) {
    
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: chat }]
              }
            ]
          })
        }
      );
  
      const response = await resp.json();
      console.log(response.candidates[0].content.parts[0].text);
      document.getElementById("loading").remove();
      AppendMessage("Gemini", response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1"));
}
  function AppendMessage(sender, chat) {
    const chatArea = document.getElementById("chatArea");
    const msgElement = document.createElement("div");
    msgElement.className = `message ${sender}`;
    msgElement.innerHTML = `<p>${chat}</p>`;
    chatArea.appendChild(msgElement); 
    chatArea.scrollTop = chatArea.scrollHeight;
    if(sender === "user"){
      let loading = document.createElement("div");
      loading,className = "loading Gemini";
      loading.id = "loading";
      loading.innerText = "Loading...";
      chatArea.appendChild(loading);
    }
 }

 function toggle(){
  document.body.classList.toggle("dark");
  let isDark = document.body.classList.contains("dark")
  if(isDark){
    document.getElementById("theme-toggle").innerText = "☀️";
  }
  else{
    document.getElementById("theme-toggle").innerText = "🌙";
  }
}
