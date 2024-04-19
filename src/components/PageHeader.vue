<template>
    <header class="header-container">
      <div class="logo">
        <img src="../assets/logoUruwala.png" alt="logo" class="logo">
        <h4>Uruwala Tea Factory</h4>
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
  font-size: 1.5rem;
  width: 70px;
  height: 70px;
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
</style>
  