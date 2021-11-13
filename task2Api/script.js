const commonLink = "https://jsonplaceholder.typicode.com/posts";
const apiMethods = ["GET", "POST", "PUT", "DELETE"];
const createMyOwnElement = (parent, ele, txt = null, classes = null) => {
  myElement = document.createElement(ele);
  parent.appendChild(myElement);
  if (txt) myElement.textContent = txt;
  if (classes) myElement.classList = classes;
  return myElement;
};
const btnWrapper = document.querySelector("#btn-wrapper");
const dataWrapper = document.querySelector("#dataWrapper");
apiMethods.forEach((apiMethod) => {
  btn = createMyOwnElement(
    btnWrapper,
    "button",
    apiMethod,
    "btn btn-primary mx-2"
  );
  btn.addEventListener("click", async function (e) {
    e.preventDefault();
    let methodName = e.target.textContent;
    // console.log(e.target.textContent);
    dataWrapper.textContent = "";
    if (methodName == "GET") {
      let data = await (await fetch(`${commonLink}`)).json();
      console.log(data);
    }
    else if (methodName == "POST") {
      fetch(`${commonLink}`, {
        method: methodName,
        body: JSON.stringify({
          title: "new title",
          body: "new body",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else if (methodName == "PUT") {
      fetch(`${commonLink}//1`, {
        method: methodName,
        body: JSON.stringify({
          id: 1,
          title: "Edited title",
          body: "Edited body",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
        methodName == "DELETE";
      fetch(`${commonLink}//1`, {
        method: methodName,
      });
      console.log("Deleted Post");
    }
  });
});
