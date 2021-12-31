import { IMAGE_URL, API_KEY } from "config/config";


export default function generateImageLink(image_path) {
  if(!image_path) {
    return "https://via.placeholder.com/200x300";
  }


  const urlParams = new URLSearchParams({
    "api_key" : API_KEY,
  });

  return `${IMAGE_URL}${image_path}?${urlParams.toString()}`;
}
