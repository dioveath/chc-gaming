## Tech Stack

### State Management
Redux

### Folder Structure 
- Containers
  Containers can be seen as folder features where all the elements for the features will exist in the same container folder.
- Components
  Components folder will contain all the common react components for the whole application. This might include react components, redux slices, etc.
- Hooks
  All the hooks will be stored. Hooks includes all the useful generic hooks


### Component UI Building
For building a component we use styled-components combined with tailwindcss using tw macro and className prop drilling. For e.g,
```jsx
	import styled from "styled-components";
	import tw from "twin.macro";	
	import { motion } from 'framer-motion';	

	const ModalContainer = styled(motion.div).attrs((props) => ({
		className: props.className,
	}))`
		width: clamp(50%, 700px, 90%);
		height: min(50%, 400px);

	${tw`
		fixed top-0 right-0 bottom-0 left-0 m-auto flex flex-col justify-center
		items-center bg-black/90 rounded-md shadow-2xl overflow-hidden z-30
	`}`;
	
	export default ModalContainer;
```
