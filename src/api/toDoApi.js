class toDoApi {
  static getAllToDos() {
    return fetch('/todo/list').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default toDoApi;
