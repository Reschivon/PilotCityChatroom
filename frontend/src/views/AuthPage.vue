<template>
  <v-container id="signinup-form" class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class>
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form" @submit.prevent="signin">
                      <h1 class="text-center display-1 mb-10" :class="`${bgColor}--text`">Sign in</h1>
                      <v-text-field
                        id="username"
                        v-model="login"
                        label="Username"
                        name="Username"
                        type="text"
                        :color="bgColor"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="Password"
                        type="password"
                        :color="bgColor"
                      />
                      <div class="text-center">
                        <a
                          href="#"
                          class="mt-3 overline no-text-decoration"
                          :class="`${bgColor}--text`"
                          @click="step = 3"
                        >Forgot your password?</a>
                      </div>
                      <div class="text-center mt-6">
                        <v-btn type="submit" large :color="bgColor" dark>Sign In</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">New User?</h1>
                      <h5 class="text-center overline mb-3">Sign Up To Join</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 2">Sign Up</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!--SignUp-->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Sign In To Enter</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <h1 class="text-center display-1 mb-10" :class="`${bgColor}--text`">Sign Up</h1>
                    <v-form class="signup-form-form" @submit.prevent="signup">
                      <v-text-field
                        id="firstname"
                        v-model="firstname"
                        label="First Name"
                        name="firstname"
                        type="text"
                      />
                      <v-text-field
                        id="lastname"
                        v-model="lastname"
                        label="Last Name"
                        name="lastname"
                        type="text"
                      />
                      <v-text-field
                        id="username"
                        v-model="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                      <v-text-field
                        id="email"
                        v-model="email"
                        label="Email"
                        name="email"
                        type="email"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="password"
                        type="password"
                      />
                      <v-text-field
                        id="confirmpassword"
                        v-model="confirmpassword"
                        label="Confirm Password"
                        name="confirmpassword"
                        type="password"
                      />
                      <div class="text-center mt-6">
                        <v-btn type="submit" large :color="bgColor" dark>Sign Up</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
            <!--PW Rest-->
            <v-window-item :value="3">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Please Sign In</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >Reset Password</h1>
                      <v-text-field
                        id="login"
                        v-model="login"
                        label="Username / Email"
                        name="login"
                        type="text"
                        :color="bgColor"
                        class="v-input__icon--double"
                      />
                      <div class="text-center mt-6">
                        <v-btn large :color="bgColor" dark>Reset Password</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from "@/components/Header";
import * as services from "../services/index.ts";

export default {
  name: "Auth",
  compononets: {
    Header
  },
  props: {
    source: {
      type: String,
      default: "white"
    },
    bgColor: {
      type: String,
      default: "--dark-gray: #404142"
    },
    fgColor: {
      type: String,
      default: "white"
    }
  },
  async fetch({ store, error }, user) {
    try {
      await store.dispatch("users/signupUser", user);
    } catch (e) {
      error({
        statusCode: 503,
        message: "Unable to sign up user. Please try again later."
      });
    }
  },
  data: () => ({
    step: 1,
    username: "",
    email: "",
    password: "",
    login: "",
    snackbarType: "success",
    snackbarMessage: "",
    snackbar: false,
    confirmpassword: null,
    lastname: "",
    firstname: ""
  }),
  methods: {
    signup() {
      services.registerUserEmailPassword(this.email, this.password);
    },
    signin() {
      services.client
        .authenticate({
          strategy: "local",
          username: this.login,
          password: this.password
        })
        .then(auth => {
          // Logged in
          this.login = "";
          this.password = "";
          console.log(auth);
        })
        .catch(e => {
          // Show login page (potentially with `e.message`)
          console.error("Authentication error", e);
        });
      this.$router.push("/chat");
    }
  }
};
</script>

<style scoped lang="scss">
.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
  background-color: #404142;
}
a.no-text-decoration {
  text-decoration: none;
}
#signinup-form {
  background-color: #404142;
}
.signup-form-form {
  max-width: 23rem;
  margin: 0 auto;
  background-color: white;
}
.card {
  overflow: hidden;
  background-color: #404142;
}
.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4f4f4f;
}
:root {
  --dark-gray: #404142;
  --medium-gray: #4f4f4f;
}
.Header {
  background-color: var(--dark-gray);
}

.chat-window {
  background-color: var(--medium-gray);
}

.items {
  background-color: var(--blue);
}
.font-Raleway {
  font-family: Raleway;
}
</style>

<!--<template>
  <div>
    <h2>Login</h2>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script> -->

<!--<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/register" class="btn btn-link">Register</router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {
    }
  },
}
</script>-->