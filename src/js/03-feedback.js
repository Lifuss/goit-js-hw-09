import storage from './storage';
import lodash from 'lodash.throttle';

const KEY_FORM = 'feedback-form-state';

const refs = { form: document.querySelector('.feedback-form') };

refs.form.addEventListener('input', lodash(onInputMessage, 500));
refs.form.addEventListener('submit', onSubmitForm);

let formObj = {};

function onInputMessage(e) {
  formObj[e.target.name] = e.target.value;
  storage.save(KEY_FORM, formObj);
}

function onSubmitForm(e) {
  e.preventDefault();
  if (!formObj.message || !formObj.email)
    return alert('Не-не, заповніть всі поля');
  console.log(formObj);
  formObj = {};
  storage.remove(KEY_FORM);
  e.target.reset();
}

function onPageReload() {
  formObj = storage.load(KEY_FORM) || {};
  refs.form.elements.email.value = formObj?.email || '';
  refs.form.elements.message.value = formObj?.message || '';
}
onPageReload();
