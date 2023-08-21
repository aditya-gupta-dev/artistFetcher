const client_id = "YOUR_CLIENT_ID";
const client_secret = "YOUR_CLIENT_SECRET";

const input = document.getElementById("input");
const button = document.getElementById("button-addon2");
const list = document.getElementById("list");
const statusHeading = document.getElementById("status");

const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method : "POST",
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+btoa(client_id+":"+client_secret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token;
};

const Item = (title, text, src) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const innerDiv = document.createElement("div");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");
    const a = document.createElement("a");

    div.setAttribute("class", "card");
    div.setAttribute("style", "width: 18rem;");

    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", src);
    
    innerDiv.setAttribute("class", "card-body");

    h5.setAttribute("class", "card-title");
    h5.innerHTML=title;
    p.setAttribute("class", "card-text");
    p.innerHTML=text;
    a.setAttribute("class", "btn btn-primary");
    a.innerHTML="Listen";

    innerDiv.appendChild(h5);
    innerDiv.appendChild(p);
    innerDiv.appendChild(a);

    div.appendChild(img);
    div.appendChild(innerDiv);
    list.appendChild(div);
};

button.addEventListener("click", (e) => {
    const artistName = input.value;

    getToken().then((data) => {
        statusHeading.innerText="Loading...";
        fetch("https://api.spotify.com/v1/search?query="+artistName+"&type=artist&offset=0&limit=20", {
            method : "GET",
            headers : {
                "Authorization": "Bearer "+data
            },
        }).then(res => res.json())
        .then((data) => {
            let artists = data.artists.items;
            for(let i = 0; artists.length; i++)
            {
                statusHeading.innerText=" ";
                Item(artists[i].name, "followers : "+artists[i].followers.total, artists[i].images[0].url);
            }
        });
    });
     
});

