class View {
    static errorFieldColor(field) {
        field.style.backgroundColor = '#f3848b';
    }

    static okFieldColor(field) {
        field.style.backgroundColor = '#ffffff';
    }

    static viewPosts(posts) {
        const containerEl = document.querySelector('.all-photos');
        for (let i = posts.length - 1; i >= 0; i--) {
            containerEl.prepend(View.buildPost(posts[i]));
        }
    }

    static removePosts(amount) {
        const containerEl = document.querySelector('.all-photos');
        for(let i = 0; i < amount; i++) {
            containerEl.removeChild(containerEl.firstChild);
        }
    }

    static viewPhotosProfile(posts, user, container) {
        if (!posts) {
            container.innerHTML = '<h1>Вы не добавили ещё ни одного поста</h1>';
            return;
        }

        let hashtags = posts[0].hashtags;
        let amount = 0;

        const photosEl = document.createElement('div');
        photosEl.setAttribute('id', 'profile-photos');
        posts.forEach((post) => {
            photosEl.prepend(View.buildPhoto(post));
            post.hashtags.forEach(tag => {
                if(!hashtags.find(curr => curr === tag)) {
                    hashtags.push(tag);
                }
            });
            amount++;
        });
        container.prepend(photosEl);
        container.prepend(View.buildInfo(user, amount, hashtags));
    }

    static clearContainer(container) {
        container.innerHTML = '';
    }

    static addPost(post) {
        document.querySelector('.all-photos').prepend(View.buildPost(post));
    }

    static removePost(id) {
        document.getElementById(id).remove();
    }

    static removeProfile(profilePhotos, profileInfo) {
        profilePhotos.remove();
        profileInfo.remove();
    }

    static edit(id, post) {
        const photoPost = document.getElementById(id);
        if (post.photoLink) {
            photoPost.querySelector('img').setAttribute('src', `${post.photoLink}`);
        }
        if (post.hashtags) {
            const tags = photoPost.querySelector('.hashtags');
            tags.innerHTML = `${post.hashtags.map(tag => `<a href="#">${tag} </a>`).join('')}`;
        }
        if (post.description) {
            photoPost.querySelector('h4 > span').innerHTML = `${post.description}`;
        }
    }

    static buildPost(post) {
        const postEl = document.createElement('article');
        postEl.setAttribute('id', post.id);
        postEl.classList.add('photo-post');
        postEl.innerHTML = `<div class="photo">
              <img src="${post.photoLink}">
            </div>
            <nav class="info">
              <img class="user-icon-info" src="${post.photoLink}"/>
              <div class="user-info">
                <p>${post.author}</p>
                <span>${post.creationDate}</span>
              </div>
              <div class="all-comments comments">
                <h4>${post.author}: <span>${post.description}</span></h4>
                <span class="hashtags"> ${post.hashtags.map(tag => `<a href="${tag}">${tag} </a>`).join('')}
                </span>
              </div>
              <div class="add-comments comments">
                <form class="form-comments">
                  <textarea class="area-comments" placeholder="Добавьте комментарий..."></textarea>
                </form>
              </div>
              <button class="delete icon" type="button">
                &#128465
              </button>
              <button class="like icon" type="button">
                &#10084<span>${post.likes.length}</span>
              </button>
              <button class="change icon" type="button">
                &#9998
              </button>
            </nav>`;
        return postEl;
    }

    static buildPhoto(post) {
        const photoEl = document.createElement('div');
        photoEl.innerHTML = `<img src="${post.photoLink}">`;
        return photoEl;
    }

    static buildInfo(user, amount, hashtags) {
        const infoEl = document.createElement('div');
        infoEl.setAttribute('id', 'profile-info');
        infoEl.innerHTML = `<div><p>${user}</p>
      <h1>Количество публикаций: <span id="amount">${amount}</span></h1>
      <h1>Часто используемые хэштеги:
        <span id="often-used-hashtags">${hashtags.map(tag =>`<span> ${tag}</span>`).join('')}</span>
      </h1></div>`;
         return infoEl;
    }
    // static showUser(userProfile, profile, userName) {
    //   userProfile.style.display = 'block';
    //   userProfile.querySelector('span').innerText = userName;
    //   profile.querySelector('p').innerText = userName;
    // }

    static showSection() {
        const allPhotos = document.querySelector('.all-photos');
        allPhotos.style.display = 'flex';
    }

    static hideSection() {
        const allPhotos = document.querySelector('.all-photos');
        allPhotos.style.display = 'none';
    }

    static showAdding() {
        const addingForm = document.querySelector('#adding');
        const loadButton = document.querySelector('.load-photo');
        addingForm.style.display = 'block';
        loadButton.style.display = 'block';
    }

    static hideAdding() {
        const addingForm = document.querySelector('#adding');
        const loadButton = document.querySelector('.load-photo');
        addingForm.style.display = 'none';
        loadButton.style.display = 'none';
    }

    static showBlock(element) {
        element.style.display = 'block';
    }

    static show(element) {
        element.style.display = 'flex';
    }

    static hide(element) {
        element.style.display = 'none';
    }

    static isHide(element) {
        return element.style.display === 'none' || element.style.display === '';
    }

    static scaleLike(like) {
        like.style.animation = 'scale 0.3s linear 1';
    }

    static noneScaleLike(like) {
        like.style.animation = 'none';
    }

    static addFilter(post, filter) {
        document.getElementById(post.id).querySelector('.photo > img').classList.add(filter[1]);
    }
}
