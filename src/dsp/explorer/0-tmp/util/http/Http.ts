class Http {

    private post(path, params, method) {

    method = method || "post" // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    let form = document.createElement("form")
    form.setAttribute("method", method)
    form.setAttribute("action", path)

    for(let key in params) {
        if(params.hasOwnProperty(key)) {
            let hiddenField = document.createElement("input")
            hiddenField.setAttribute("type", "hidden")
            hiddenField.setAttribute("name", key)
            hiddenField.setAttribute("value", params[key])

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form)
    form.submit()
  }

}
