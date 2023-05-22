'use strict';

{
  // Storage
  // const data = [];
  const phonebook = 'phonebook';

  const getStorage = (key) => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const setStorage = (key, object) => {
    const data = getStorage(key);
    data.push(object);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const dataStorage = JSON.parse(localStorage.getItem(phonebook));
  
  const removeStorage = (key, phoneNumber) => {
    const data = getStorage(key);
    const dataFiltered = data.filter((item) => item.phone !== phoneNumber);
    localStorage.setItem(key, JSON.stringify(dataFiltered));
  };

  const addContactData = (contact) => {
    // data.push(contact);
    setStorage(phonebook, contact);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend',
        `<tr>
            <th class = 'delete'>Удалить</th>
            <th class = 'nameTr'>Имя</th>
            <th class = 'surnameTr'>Фамилия</th>
            <th>Телефон</th>
        </tr>`,
    );

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
        <button class = 'close' type = 'button'></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class = 'form-group'>
            <label class = 'form-label' for='name'>Имя:</label>
            <input class = 'form-input' name = 'name' id='name'
            type = 'text' required>
        </div>

        <div class = 'form-group'>
            <label class = 'form-label' for='surname'>Фамилия:</label>
            <input class = 'form-input' name = 'surname' id='surname'
            type = 'text' required>
        </div>

        <div class = 'form-group'>
            <label class = 'form-label' for='phone'>Телефон:</label>
            <input class = 'form-input' name = 'phone' id='phone'
            type = 'number' required>
        </div>
        `);
    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    }]);
    form.append(...buttonGroup.btns);

    overlay.append(form);
    return {
      overlay, form,
    };
  };

  const createH2 = () => {
    const h2 = document.createElement('h2');
    h2.classList.add('logo');
    h2.textContent = 'Все права защищены. ©Максим';

    return h2;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3 js-add',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
    ]);


    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const h2 = createH2();
    footer.footerContainer.append(h2);
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const tdEdit = document.createElement('td');
    tdEdit.classList.add('edit');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit-icon');
    tdEdit.append(buttonEdit);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (elem, data) => {
    // Добавил
    elem.replaceChildren();
    const allRow = data ? data.map(createRow) : [];
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
    });
    allRow.forEach(contact => {
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    btnAdd.addEventListener('click', () => {
      openModal();
    });

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        const targetName =
        target.closest('.contact').querySelector('td:nth-child(4)').textContent;
        removeStorage(phonebook, targetName);
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      addContactData(newContact);
      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list, logo, btnAdd, formOverlay, btnDel, form} =
    renderPhoneBook(app, title);

    // Реализация сортировки
    const sortName = document.querySelector('.nameTr');
    const sortSurname = document.querySelector('.surnameTr');

    sortName.addEventListener('click', () => {
      const sortData = [...dataStorage];
      dataStorage.sort((a, b) => {
        console.log(a, b);
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      localStorage.setItem(phonebook, JSON.stringify(sortData));
      renderContacts(list, sortData);
    });

    sortSurname.addEventListener('click', () => {
      dataStorage.sort((a, b) => {
        console.log(a, b);
        if (a.surname > b.surname) {
          return 1;
        }
        if (a.surname < b.surname) {
          return -1;
        }
        return 0;
      });
      localStorage.setItem(phonebook, JSON.stringify(dataStorage));
      renderContacts(list, dataStorage);
    });

    const allRow = renderContacts(list, dataStorage);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}
