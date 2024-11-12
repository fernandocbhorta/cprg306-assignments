export default function Item({name, quantity, category, onSelect, isSelected}) {
   
   
    return ( 
        <div className={`p-4 m-4 ${isSelected ? "bg-slate-900" : "bg-stone-900"}  max-w-screen-sm`} onClick={onSelect}>
            <li>
                <div className="text-lg">{name}</div>
                <div className="text-sm text-yellow-100">Buy {quantity} at the {category} aisle</div>
            </li>            
        </div>
    );
}