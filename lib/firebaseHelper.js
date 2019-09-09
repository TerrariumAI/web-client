var idToken

// GetIdToken returns the stored idToken if one exists. If not, it creates an auth state change
// listener to get idTokens
export async function GetIdToken(firebase) {
  if (idToken) {
    console.log("GetIdToken(): Returning stored id token")
    return idToken
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(_idToken => {
          idToken = _idToken
          console.log("GetIdToken(): Returning directly from listener")
          return idToken
        });
      }
    });
  }
}