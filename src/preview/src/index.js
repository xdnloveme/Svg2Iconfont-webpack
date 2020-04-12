import './index.css';
import Toast from './toast';

let isFirstOnload = true;
let cssPrefix = 'iconfont';

window.onload = function() {
  const ws = new WebSocket(`ws://${window.location.host}`);

  ws.onopen = function(event) {
    console.log('WebSocket is open now.', event, ws);
    ws.send('iconList');
  };

  ws.onerror = function() {
    document.getElementById('root').innerHTML = '错误';
  };

  // Listen for messages
  ws.addEventListener('message', function(event) {
    console.log('Receive from Websocket', event);
    let iconList = [];
    try {
      const payload = JSON.parse(event.data);
      iconList = payload.iconList;
      cssPrefix = payload.pluginOptions.fontOptions['cssPrefix'] || cssPrefix;
      if (isFirstOnload) {
        isFirstOnload = false;
      } else {
        fetchAssets();
      }

      renderIconList(iconList);
    } catch (e) {
      console.log(e);
      document.getElementById('root').innerHTML = JSON.stringify(e);
    }
  });
};

function renderIconList(iconList) {
  const container = document.createDocumentFragment();
  container.appendChild(createIconListContainer(iconList));

  document.getElementById('root').innerHTML = null;
  document.getElementById('root').appendChild(container);
}

function formatName(pathName) {
  const splitName = pathName.split('.');

  // remove suffix
  splitName.pop();
  const name = splitName
    .join('')
    .split('/')
    .join('-');

  return name;
}

function createIconListContainer(iconList) {
  const container = document.createDocumentFragment();

  // title
  const h1Node = document.createElement('h1');
  h1Node.appendChild(document.createTextNode('Icon 图标列表'));

  // list
  const ulNode = document.createElement('ul');
  ulNode.setAttribute('class', 'icon-list-ul');
  for (let i = 0; i < iconList.length; i++) {
    const liNode = document.createElement('li');

    const actualName = formatName(iconList[i].oppositePath);

    const iNode = document.createElement('i');

    // set class name
    const iNodeClassName = `${cssPrefix}-${actualName}`;
    iNode.setAttribute('class', iNodeClassName);

    createCopyClickEvent(liNode, iNodeClassName);

    const pNode = document.createElement('p');

    const liText = document.createTextNode(actualName);
    pNode.appendChild(liText);
    liNode.appendChild(iNode);
    liNode.appendChild(pNode);
    ulNode.appendChild(liNode);
  }

  container.appendChild(h1Node);
  container.appendChild(ulNode);

  return container;
}

function fetchAssets() {
  const link2 = document.getElementsByTagName('link')[0];
  const href = link2.href.split(link2.baseURI)[1];
  link2.href = href;
}

function createCopyClickEvent(node, text) {
  node.onclick = function() {
    copyText(text, function() {
      Toast(`复制 ${text} 成功至剪切板`);
    });
  };
}

function copyText(text, callback) {
  var tag = document.createElement('input');
  tag.setAttribute('id', 'cp_hgz_input');
  tag.value = text;
  document.getElementsByTagName('body')[0].appendChild(tag);
  document.getElementById('cp_hgz_input').select();
  document.execCommand('copy');
  document.getElementById('cp_hgz_input').remove();
  if (callback) {
    callback(text);
  }
}
