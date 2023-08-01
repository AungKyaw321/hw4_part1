/* dom.js */

function init() {
  let element = document.getElementById("walkBtn");
  element.addEventListener("click", function () {
    walk();
  });

  element = document.getElementById("modifyBtn");
  element.addEventListener("click", function () {
    modify();
  });

  element = document.getElementById("addBtn");
  element.addEventListener("click", function () {
    add();
  });

  element = document.getElementById("removeBtn");
  element.addEventListener("click", function () {
    remove();
  });

  element = document.getElementById("AdvancedBtn");
  element.addEventListener("click", function () {
    advancedWalk();
  });

  element = document.getElementById("advancedModifyBtn");
  element.addEventListener("click", function () {
    advancedModify();
  });

  element = document.getElementById("add");
  element.addEventListener("click", function () {
    advancedAdd();
  });

  element = document.getElementById("safeDelete");
  element.addEventListener("click", function () {
    safeDelete();
  });

  element = document.getElementById("deleteBySelectorBtn");
  element.addEventListener("click", function () {
    deleteBySelector();
  });

  element = document.getElementById("basicCloneBtn");
  element.addEventListener("click", function () {
    basicClone();
  });

  element = document.getElementById("addTemplate");
  element.addEventListener("click", function () {
    addClonedTemplate();
  });
}

function walk() {
  let el;

  el = document.getElementById("p1");
  showNode(el);

  el = el.firstChild;
  showNode(el);

  el = el.nextSibling;
  showNode(el);

  el = el.lastChild;
  showNode(el);

  el = el.parentNode.parentNode.parentNode;
  showNode(el);

  el = el.querySelector("section > *");
  showNode(el);
}

function advancedWalk() {
  let startNode = document.documentElement;
  let indents = 0;
  let outputTextArea = document.getElementById("outputTextArea");
  outputTextArea.value = "";
  walkTree(startNode, indents);
}

//done recursively
function walkTree(node, indent) {
  let space = " ";
  let repeatedIndent = space.repeat(indent);

  outputTextArea.value += repeatedIndent + `|-- ${node.nodeName}\n`;

  let childNodes = node.childNodes;
  let i = 0;
  while (i < childNodes.length) {
    let childNode = childNodes[i];
    if (childNode.nodeType === 1) {
      walkTree(childNode, indent + 4);
    }
    i++;
  }
}

function showNode(el) {
  let nodeType = el.nodeType;
  let nodeName = el.nodeName;
  let nodeValue = el.nodeValue;
  /*
  alert(
    `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`
  );
*/
  let outputTextArea = document.getElementById("outputTextArea");
  outputTextArea.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
}

function modify() {
  let el = document.getElementById("p1");

  // You can do all the properties one by one if you know them in HTML
  el.title = "I was changed by JS";

  // you can update the style as a string
  // el.style = 'color: blue; font-size: 1em;';

  // you also may prefer to update on the CSS object.  This is the same as above
  // el.style.color = 'blue';
  // el.style.fontSize = '1em';
  // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

  // you can also update the class list
  el.classList.add("fancy");

  // you can also update the dataset which change data-* attributes
  el.dataset.cool = "true"; // data-cool="true"
  el.dataset.coolFactor = "9000"; //data-cool-factor="9000"
}
function advancedModify() {
  //can I modify html page by adding ids
  document.getElementById("h1").innerHTML = "DOM Manipulation is Fun!";
  const colors = [
    "--darkcolor1",
    "--darkcolor2",
    "--darkcolor3",
    "--darkcolor4",
    "--darkcolor5",
    "--darkcolor6",
  ];
  let randomNumber = Math.floor(Math.random() * 6);
  document.getElementById("h1").style = `color: var(${colors[randomNumber]});`;
  let el = document.getElementById("p1");
  el.classList.toggle("shmancy");
}

function add() {
  let p, em, txt1, txt2, txt3;

  // first we do things the long old-fashioned standard DOM way
  p = document.createElement("p"); // <p></p>
  em = document.createElement("em"); // <em></em>
  txt1 = document.createTextNode("This is a "); // "This is a"
  txt2 = document.createTextNode("test"); // "test"
  txt3 = document.createTextNode(" of the DOM"); // " of the DOM"

  p.appendChild(txt1); // <p>This is a</p>
  em.appendChild(txt2); // <em>test</em>
  p.appendChild(em); // <p>This is a<em>test</em></p>
  p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

  // go an insert this new copy below the old one
  let oldP = document.getElementById("p1");
  oldP.parentNode.insertBefore(p, oldP.nextSibling);

  // Alternative method using innerHTML and insertAdjacentHTML
  // let oldP = document.getElementById('p1');
  // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
  // clearly short hands are pretty easy!
  /*
  let selected = getElementById("select");
  let selectedOption = selected.value;
  if(selectedOption == "TextNode"){

  }
  */
}

function advancedAdd() {
  let selected = document.getElementById("selected");
  let output = document.getElementById("output");
  let newElement;
  let selectedOption = selected.value;
  if (selectedOption == "TextNode") {
    newElement = document.createTextNode(
      "New Text Node: " + new Date().toLocaleString()
    );
  } else if (selectedOption == "Comment") {
    newElement = document.createComment(
      "New Comment: " + new Date().toLocaleString()
    );
  } else if (selectedOption == "Element") {
    const tagName = document.getElementById("elementTagName").value;
    newElement = document.createElement(tagName);
    neFElement.textContent = "New Element: " + new Date().toLocaleString();
  }
  output.appendChild(newElement);
}
//change variables here
//submit tomorrow after confirming with TAs
function safeDelete() {
  let controlPart = document.getElementById("controls");
  let deletePart = document.body.firstChild;

  while (deletePart) {
    let nextSibling = deletePart.nextSibling;

    if (deletePart !== controlPart) {
      let child = deletePart.lastChild;
      while (child) {
        let prevSibling = child.previousSibling;
        if (!controlPart.contains(child)) {
          child.remove();
        }
        child = prevSibling;
      }

      if (deletePart.parentNode) {
        deletePart.remove();
      }
    }

    deletePart = nextSibling;
  }
}

function deleteBySelector() {
  let input = document.getElementById("selectorInput");
  let selectedDelete = input.value;
  let deleteElement = document.querySelector(selectedDelete);
  while (deleteElement) {
    deleteElement.remove();
    deleteElement = document.querySelector(selectedDelete);
  }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function basicClone() {
  const original = document.getElementById("p1");
  const cloned = document.createElement("p");
  cloned.innerHTML = original.innerHTML;
  output.appendChild(cloned);
}

function addClonedTemplate() {
  let template = document.getElementById("template1");
  let clonedCard = template.content.cloneNode(true);
  clonedCard.querySelector(".title1").textContent =
    "Template " + Math.floor(Math.random() * 100);
  clonedCard.querySelector(".img1").src = "/images/cat.jpg";
  clonedCard.querySelector(".p2").textContent =
    "Content " + Math.floor(Math.random() * 100);

  let appendArea = document.getElementById("addTemplateHere");
  appendArea.appendChild(clonedCard);
}

window.addEventListener("DOMContentLoaded", init);
