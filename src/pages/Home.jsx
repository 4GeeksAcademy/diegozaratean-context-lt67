import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	function getContactList(){
		fetch('https://playground.4geeks.com/contact/agendas/gordonfreeman/contacts')
		.then( (reponse)=> reponse.json() )
		.then( (data)=> {
			console.log(data.contacts)			
			dispatch({
				type: 'load_contacts',
				payload: data.contacts
			})
		} )
	}


	useEffect(()=>{
		console.log('Se cargo el componente')
		getContactList()
		
	},[])

	function deleteContact(idToDelete) {
		console.log("deleteContact" + idToDelete)

		const requestOptions = {
			method: "DELETE"
			};

		fetch('https://playground.4geeks.com/contact/agendas/gordonfreeman/contacts/' + idToDelete,requestOptions)
		.then( (data)=> {
			console.log(data)
			getContactList()
		} )
		// dispatch({
		// 	type: "delete_contact",
		// 	payload: { indexToDelete: indexToDelete }

		// })

	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<ul className="list-group">
				{/* Map over the 'todos' array from the store and render each item as a list element */}
				{store && store.contacts?.map((item) => {
					return (
						<li
							key={item.id}  // React key for list items.
							className="list-group-item d-flex justify-content-between"
						>
							<div>
								<p>Name: {item.name} </p>
								<p>Phone: {item.phone} </p>
								<p>email: {item.email} </p>
								<p>Id: {item.id} </p>
							</div>
							<button onClick={() => deleteContact(item.id)}>Eliminar</button>



						</li>
					);
				})}
			</ul>
			<br />

			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 