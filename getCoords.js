export default async function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const long = pos.coords.longitude;
        const lat = pos.coords.latitude;
        resolve({ long, lat });
      },
      (error) => {
        reject(error);
      }
    );
  });
}
