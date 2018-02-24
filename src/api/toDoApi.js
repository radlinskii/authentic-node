class toDoApi {
  static getAllToDos() {
    return fetch('http://localhost:8080/todo/list').then(response => {
      return response.json();
      /*[{
        id: 1,
        name: 'aga',
        age: 21,
      },
      {
        id: 2,
        name: 'igi',
        age: 22,
      },
      ];*/
    }).catch(error => {
      return error;
    });
  }
}

export default toDoApi;
