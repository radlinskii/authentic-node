class userApi {
  static getUser() {
    return fetch('/user/get').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default userApi;
