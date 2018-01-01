class ModuleLoader {
    constructor(changeableDivId) {
        this.id = changeableDivId;
    }

    changeContent(componentName) {
        console.log(componentName);
        let cc = document.getElementById(this.id);
        let nodes = document.getElementById(this.id).childNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() === 'iframe' || nodes[i].nodeName.toLowerCase() === 'div') {
                nodes[i].remove();
            }
        }

        let ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "../components/" + componentName + "/" + componentName + ".html");

        cc.appendChild(ifrm);
    }

}