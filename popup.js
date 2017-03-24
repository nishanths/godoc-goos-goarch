var updateParams = (goos, goarch) => {
    // Really? Is this the easiest way with activeTab permission?
    chrome.tabs.executeScript({
        code: `
        var goos = "${goos}";
        var goarch = "${goarch}";
        var params = new URLSearchParams(window.location.search);
        params.set("GOOS", goos);
        params.set("GOARCH", goarch);
        window.location.search = params.toString();`
    });
};

var init = () => {
    var form = document.querySelector("form");
    var goosSelect = document.querySelector("select[name=goos]");
    var goarchSelect = document.querySelector("select[name=goarch]");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        var goos = goosSelect.value;
        var goarch = goarchSelect.value;
        debugger;
        updateParams(goos, goarch);
        chrome.storage.local.set({
            "godoc.goos": goos,
            "godoc.goarch": goarch
        }, () => {
            window.close();
        });
    });

    chrome.storage.local.get({"godoc.goos": "", "godoc.goarch": ""}, (info) => {
        var goos = info["godoc.goos"];
        var goarch = info["godoc.goarch"];
        if (goos != "") {
            goosSelect.value = goos;
        }
        if (goarch != "") {
            goarchSelect.value = goarch;
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
