import Queue from './queue';

const queue = new Queue();

let timers = [];

export default function (message) {
  const ids = queue.map(q => q.id);

  let id = 1;
  while (ids.includes(id)) {
    id++;
  }

  const toastDom = createToast(id, message);

  queue.push({
    id,
    dom: toastDom,
  })
  
  document.body.appendChild(toastDom);

  const toastTimer = setTimeout(() => {
    const last = queue.pop();
    const dom = document.getElementById(`toast-${last.id}`);

    if (dom) {
      document.body.removeChild(dom);
    }
    clearTimeout(toastTimer);
        
  }, 2000);
  
  timers.push(toastTimer);
}

function createToast (id, message) {
  const toastContainer = document.createDocumentFragment();

  const div = document.createElement('div');

  // className
  div.setAttribute('class', 'toast-div');
  div.setAttribute('id', `toast-${id}`);
  div.setAttribute('style', `top: ${id * 60}px`)

  const p = document.createElement('p');
  const text = document.createTextNode(message);
  p.appendChild(text);
  div.appendChild(p);
  toastContainer.appendChild(div);

  return toastContainer;
}

window.onbeforeunload = function () {
  while (timers.length > 0) {
    clearTimeout(timers.pop());
  }
}