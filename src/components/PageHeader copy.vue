<template>
  <header class="header-container">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/logoUruwala.png" alt="logo" class="logo">
      </router-link>
       <h4 class="company-name">Uruwala Tea Factory</h4>
    </div>
    <nav class="nav-links">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Product</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">Cart</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  // Header component logic
}
</script>

<style scoped>
.header-container {
  background-color: #2A3925;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  display: flex;
  align-items: center; /* Align items vertically */
}

.logo img {
  width: 70px;
  height: 70px;
}

.company-name {
  margin-left: 10px; /* Adjust the margin as needed */
  font-size: 14px; /* Set the font size to make it smaller */
}

.nav-links ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links ul li {
  display: inline-block;
  margin-right: 10px;
}

.nav-links ul li a {
  color: #ffffff;
  text-decoration: none;
}

.body {
  margin: unset;
}
</style>
