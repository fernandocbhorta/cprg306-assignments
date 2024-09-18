export default function Item({name, quantity, category}) {
    return ( 
        <main className="p-4 m-4 bg-slate-900 max-w-screen-sm">
            <li>
                <div className="text-lg">{name}</div>
                <div className="text-sm text-yellow-100">Buy {quantity} at the {category} aisle</div>
            </li>            
        </main>
    );
}