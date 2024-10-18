import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faSpinner,
  faPlusCircle,
  faPhone,
  faEnvelope, 
  faMapMarkedAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook, 
  
} from "@fortawesome/free-brands-svg-icons"; 

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(
    faTrash,
    faSignOutAlt,
    faEdit,
    faSpinner,
    faPlusCircle,
    faPhone,
    faEnvelope,
    faMapMarkedAlt,
    faLock,
    faFacebook
    
  );
};

export default Icons;
