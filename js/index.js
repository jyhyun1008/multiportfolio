
document.documentElement.style.setProperty(`--accent`, accent);
document.documentElement.style.setProperty(`--grad`, grad);

if (isDarkMode) {
    document.documentElement.style.setProperty(`--bg`, '#081B33');
    document.documentElement.style.setProperty(`--button`, '#152642');
    document.documentElement.style.setProperty(`--fg`, '#ffffff');
    document.documentElement.style.setProperty(`--title`, grad);
} else {
    document.documentElement.style.setProperty(`--bg`, '#ffffff');
    document.documentElement.style.setProperty(`--button`, '#f1f3f5');
    document.documentElement.style.setProperty(`--fg`, '#081B33');
    document.documentElement.style.setProperty(`--title`, accent);
}

function parseMd(md){ // 깃허브 등에 사용하는 마크다운 파일을 html로 변환시켜 줍니다.
    // 정규식으로 되어 있습니다. 자세한 것은 정규식을 공부해 주세요.

    md = '\n'+md;

    const md0 = md.replace(/\</gm,"&lt;").replace(/\>/gm, "&gt;");
  
    //ul
    md = md.replace(/^\s*\n\*\s/gm, '<ul">\n* ');
    md = md.replace(/^(\*\s.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*\s(.+)/gm, '<li class="list before">$1</li>');
    
    //ul
    md = md.replace(/^\s*\n\-\s/gm, '<ul>\n* ');
    md = md.replace(/^(\-\s.+)\s*\n([^\-])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\-\s(.+)/gm, '<li class="list before">$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\.\s/gm, '<ol>\n1. ');
    md = md.replace(/^(\d\.\s.+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.\s(.+)/gm, '<li>$1</li>');
    
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
    md = md.replace('</blockquote><blockquote>', '');
    md = md.replace('</blockquote>\n<blockquote>', '\n');

    //hr
    md = md.replace(/[\-]{3}/g, '</div></div><div class="item_wrap"><div class="line">'+lineBreak+'</div><div class="item">');
    
    //h
    md = md.replace(/\n[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/\n[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/\n[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/\n[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/\n[\#]{2}(.+)/g, '<div class="linkbox"><h2>$1</h2></div>');
    md = md.replace(/\n[\#]{1}(.+)/g, '</div></div><div class="item_wrap"><div class="item"><h1>' + twemoji.parse(titleEmoji) + ' $1</h1>');
    
    //images with links
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<div class="gallery"><a href="$3"><img class="postimage" src="$2" alt="$1" width="100%" /></a></div>');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img class="postimage" src="$2" alt="$1" width="100%" />');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    
    //font styles
    md = md.replace(/[\*]{2}([^\*]+)[\*]{2}/g, '<strong>$1</strong>');
    md = md.replace(/[\*]{1}([^\*]+)[\*]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');


    //주석
    md = md.replace(/\n[\/]{2}(.+)/g, '');
    

    //code
    md = md.replace(/[\`]{1}([^\`\n]+)[\`]{1}/g, '<code>$1</code>');

    //pre
    
    var mdpos = [];
    var rawpos = [];
    let pos1 = -1;
    let k = 0;

    var diff = [0]

    while( (pos1 = md0.indexOf('\n```', pos1 + 1)) != -1 ) { 
        if (k % 2 == 0){
            rawpos[k] = pos1 + 4;
        } else {
            rawpos[k] = pos1;
        }
        k++;
    }

    let pos2 = -1;
    let l = 0;

    while( (pos2 = md.indexOf('\n```', pos2 + 1)) != -1 ) { 
        if (l % 2 == 0){
            mdpos[l] = pos2 - 1;
        } else {
            mdpos[l] = pos2 + 5;
        }
        l++;
    }

    for (var i = 0; i < mdpos.length; i++){
        if (i % 2 == 0){

            console.log(md.substring(mdpos[i] - diff[i], mdpos[i+1] - diff[i]))

            md = md.replace(md.substring(mdpos[i] - diff[i], mdpos[i+1] - diff[i]), '<pre class="code">'+md0.substring(rawpos[i], rawpos[i+1])+'</pre>');

            var mdSubStringLength = mdpos[i+1] - mdpos[i];
            var rawSubStringLength = rawpos[i+1] - rawpos[i] + '<pre class="code">'.length + '</pre>'.length;
            diff[i+2] = diff[i] + mdSubStringLength - rawSubStringLength;

            console.log(diff)

        }
    }

    //br
    md = md.replace(/\n\n\n/g, '</p><p> </p><p>');
    md = md.replace(/\n\n/g, '</p><p>');
    
    return md;
    
}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject();
var category = qs.c;
var project = qs.p;

if (!category && !project) {
    document.querySelector(".header").innerHTML = "<img src='./assets/profile.png'>";
    document.querySelector(".header").innerHTML += "<h1>"+userName+"</h1>";
    document.querySelector(".header").innerHTML += "<p><i class='bx bxl-github'></i> "+githubUserName+"</p>";
    document.querySelector(".header").innerHTML += "<div class='line'>"+lineBreak+"</div>";
    document.querySelector(".category").innerHTML += "<a href='?'><div class='item'>전체보기</div></a>";

    for (let i = 0; i < categories.length; i++) {
        document.querySelector(".category").innerHTML += "<a href='?c="+categories[i].url+"'><div class='item'>"+categories[i].title+"</div></a>";
        document.querySelector(".main").innerHTML += '<h1>'+twemoji.parse(titleEmoji)+' '+categories[i].title+'</h1>'
        for (let j = 0; j < categories[i].children.length; j++) {
            document.querySelector(".main").innerHTML += "<a href='?p="+categories[i].children[j].url+"'><div class='linkbox'><h2>"+categories[i].children[j].title+"</h2></div></a>"
        }
    }
    var url = "https://raw.githubusercontent.com/"+githubUserName+"/"+githubRepoName+"/main/README.md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".header").innerHTML += parseMd(out)
    })
    .catch(err => { throw err });
} else if (category) {
    document.querySelector(".header").innerHTML = "<img src='./assets/profile.png'>";
    document.querySelector(".header").innerHTML += "<h1>"+userName+"</h1>";
    document.querySelector(".header").innerHTML += "<p><i class='bx bxl-github'></i> "+githubUserName+"</p>";
    document.querySelector(".header").innerHTML += "<div class='line'>"+lineBreak+"</div>";
    document.querySelector(".category").innerHTML += "<a href='?'><div class='item'>전체보기</div></a>";

    for (let i = 0; i < categories.length; i++) {
        document.querySelector(".category").innerHTML += "<a href='?c="+categories[i].url+"'><div class='item'>"+categories[i].title+"</div></a>";
        if (category == categories[i].url){
            document.querySelector(".main").innerHTML += '<h1>'+twemoji.parse(titleEmoji)+' '+categories[i].title+'</h1>'
            for (let j = 0; j < categories[i].children.length; j++) {
                document.querySelector(".main").innerHTML += "<a href='?p="+categories[i].children[j].url+"'><div class='linkbox'><h2>"+categories[i].children[j].title+"</h2></div></a>"
            }
        }
    }
    var url = "https://raw.githubusercontent.com/"+githubUserName+"/"+githubRepoName+"/main/README.md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".header").innerHTML += parseMd(out)
    })
    .catch(err => { throw err });
} else if (project) {
    document.querySelector(".header").innerHTML = "<div><a href='?'>돌아가기</a></div>";
    document.querySelector(".header").innerHTML += "<img src='./assets/"+project+".png'>";
    
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].children.length; j++) {
            if (project == categories[i].children[j].url){                
                document.querySelector(".header").innerHTML += "<h1>"+categories[i].children[j].title+"</h1>";
                document.querySelector(".header").innerHTML += "<div>"+categories[i].children[j].description+"</div>";
            }
        }
    }
    var url = "https://raw.githubusercontent.com/"+githubUserName+"/"+githubRepoName+"/main/project/"+project+".md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".main").innerHTML += parseMd(out)
    })
}