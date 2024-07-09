<template>
  <PageHeader />
  <div class="video-container">
    <video ref="videoElement" controls width="100%">
      <source :src="videoSource" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- <video id="video" controls width="100%" autoplay>
      <source src="http://localhost:5154/TEA/LandingVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->
  </div>
  <!-- <img src="/src/assets/feedbackBG.jpg" alt="Landing Page Image" width="100%" /> -->

  <!-- <video
    src="/src/assets/LandingVideo.mp4"
    controls
    width="100%"
  >
    Your browser does not support the video tag.
  </video>  -->
  <div class="background-container">
    <div class="dashboard-box">
      <h1>Welcome to Our Tea Factory</h1>
      <p>
        We are dedicated to providing the finest teas sourced from around the
        world.
      </p>
      <h2>Our Specialties</h2>
      <ul>
        <li>Organic Green Tea</li>
        <li>Earl Grey</li>
        <li>Chai</li>
        <li>Oolong</li>
      </ul>
      <p>Explore our collection and experience the essence of tea culture.</p>
      <div class="pic-container"></div>
    </div>
  </div>
  <PageFooter />
</template>

<script>
import PageHeader from "./PageHeader.vue";
import PageFooter from "./PageFooter.vue";
export default {
  data() {
    return {
      videoSource: "http://localhost:5154/TEA/LandingVideo.mp4",
    };
  },
  components: {
    PageHeader,
    PageFooter,
  },
  name: "TeaFactoryHome",
  methods: {
    playVideo() {
      const video = this.$refs.videoElement;
      video.play();
    },
  },
  mounted() {
    // Access the video element using the ref attribute
    /*
    const video = this.$refs.videoElement;
    console.log(video);
    // Play the video when the component is mounted
    video.play();
    */
    //this.playVideo();
  },
};
</script>

<style scoped>
.video-container {
  /* background-image: url("/src/assets/LandingVideo.mp4"); */
  position: relative;
}
.background-container {
  background-image: url("/src/assets/2.png");
  font-weight: bold;
  background-color: #f2f2f2;
  padding: 20px;
}
.pic-container {
  background-image: url("/src/assets/yellow box.jpg");
  /* background-size: cover; */
  background-position: center;
  overflow: hidden;
  width: 100px;
  height: 100px;
  padding: 50%;
}

.dashboard-box {
  background-color: #cead5c;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-box h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.dashboard-box h2 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.dashboard-box ul {
  margin-bottom: 20px;
}

.dashboard-box li {
  margin-bottom: 5px;
}
</style>
