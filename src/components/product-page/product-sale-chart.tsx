import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



export default function ProductSaleChart({data}:{

    data: {
        date:string,
        quantity:number
    }[]
}) 
{
    
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={400}
        height={300}
        data={data}
        className='pr-10'
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
       
      </LineChart>
    </ResponsiveContainer>
  );
}
