if(document.getElementById('editHref'))
  document.getElementById('editHref').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('edit').style.display = 'block';
    document.getElementById('editInput').value = document.getElementById('todoContent').innerText;
    e.target.style.display = 'none';
  });

