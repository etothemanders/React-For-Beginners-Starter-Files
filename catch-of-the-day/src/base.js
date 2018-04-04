import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCUSaloKBUGwavKM-28Qvjj6EORglEhlWQ",
  authDomain: "catch-of-the-day-etothemanders.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-etothemanders.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
