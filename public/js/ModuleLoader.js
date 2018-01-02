class ModuleLoader {
    constructor(changeableDivId) {
        this.id = changeableDivId;
    }

    changeContent(componentName, componentSrc) {
        let cc = document.getElementById(this.id);
        let nodes = document.getElementById(this.id).childNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() === 'iframe' || nodes[i].nodeName.toLowerCase() === 'div') {
                nodes[i].remove();
            }
        }

        let ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", componentSrc);
        ifrm.setAttribute("scrolling", "no");
        ifrm.width = 500 + "px";
        ifrm.height = 500 + "px";

        cc.appendChild(ifrm);
    }

}