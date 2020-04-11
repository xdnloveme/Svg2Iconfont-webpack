import './index.css';

window.onload = function() {
  const ws = new WebSocket('ws://localhost:8082');

  ws.onopen = function(event) {
    console.log('WebSocket is open now.', event, ws);
    ws.send('iconList');
  };

  ws.onerror = function() {
    document.getElementById('root').innerHTML = '错误';
  };

  // Listen for messages
  ws.addEventListener('message', function(event) {
    console.log('Message from server ', event);
    try {
      const iconList = JSON.parse(event.data);
      fetchAssets();
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
  console.log(iconList);
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
    const iNodeClassName = `iconfont-${actualName}`;
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
  link2.href = '/css/iconfont-web.css';
}

function createCopyClickEvent(node, text) {
  node.onclick = function() {
    copyText(text, function() {
      console.log('复制成功');
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
