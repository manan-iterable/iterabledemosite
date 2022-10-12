// my-component.js
export default {
    data() {
      return {
        email_address: ''
      }
    },
    template: `<h3>Welcome to Iterable Demo</h3>
        <label>Email: </label>
        &nbsp;&nbsp;<input class="input-sm" v-model="email_address" placeholder="Enter your email" />&nbsp;&nbsp;
        <button class="btn btn-success btn-sm" type="button" id="email" onclick="login()">Login</button>`
  }

  