const contactList = document.getElementById('contact-list');
let editingId = null;

// Ambil semua kontak dari API
function fetchContacts() {
    fetch('http://127.0.0.1:5000/contacts')
        .then(res => res.json())
        .then(data => {
            contactList.innerHTML = '';
            data.forEach(contact => renderContact(contact));
        });
}

// Render satu kontak
function renderContact(contact) {
    const div = document.createElement('div');
    div.className = 'contact-card';

    const info = document.createElement('div');
    info.innerHTML = `
        <p><strong>Nama:</strong> ${contact.nama}</p>
        <p><strong>Telepon:</strong> ${contact.telepon}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'flex gap-2';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn-warning';
    editBtn.onclick = () => editContact(contact);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.className = 'btn-danger';
    delBtn.onclick = () => deleteContact(contact.id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    div.appendChild(info);
    div.appendChild(actions);
    contactList.appendChild(div);
}

// Fungsi submit: tambah atau update
document.getElementById('add-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;

    const payload = { nama, telepon, email };

    if (editingId) {
        // Mode Update
        fetch(`http://127.0.0.1:5000/contacts/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(() => {
                fetchContacts();
                resetForm();
            });
    } else {
        // Mode Tambah
        fetch('http://127.0.0.1:5000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(() => {
                fetchContacts();
                resetForm();
            });
    }
});

// Edit kontak (isi form + ubah tombol)
function editContact(contact) {
    document.getElementById('nama').value = contact.nama;
    document.getElementById('telepon').value = contact.telepon;
    document.getElementById('email').value = contact.email;
    editingId = contact.id;

    document.querySelector('button[type="submit"]').textContent = 'Update Kontak';
}

// Hapus kontak
function deleteContact(id) {
    if (confirm('Yakin ingin menghapus kontak ini?')) {
        fetch(`http://127.0.0.1:5000/contacts/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchContacts());
    }
}

// Reset form
function resetForm() {
    document.getElementById('add-form').reset();
    editingId = null;
    document.querySelector('button[type="submit"]').textContent = 'Simpan Kontak';
}

// Saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchContacts);
