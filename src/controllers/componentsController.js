const pool = require('../configs/db.js');
const getAllcomponent =  async (req,res)=>{
    try{
        const query=`SELECT * FROM components;`;
        const result = await pool.query(query);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'Error fetching components'});
    }
}

const compatibleCpu = async (req,res) => {

    try{
        const {selectedComponent} = req.body;

        let query = `SELECT * FROM components where 1=1 `;

        if(selectedComponent&&selectedComponent.length!=0){

            const motherboard = selectedComponent.find(c => c.category === 'Motherboard');

            if(motherboard){
                query+=`AND socket_type='${motherboard.socket_type}' `;
            }

            const ram = selectedComponent.find(c => c.category === 'RAM');

            if(ram){

                if(ram.memory_type=='DDR3'){
                    query+=`AND memory_type IN ('DDR3', 'DDR3/DDR4', 'DDR3/DDR4/DDR5') `;
                }
                else if(ram.memory_type=='DDR4'){
                    query+=`AND memory_type IN ('DDR4', 'DDR4/DDR5') `;
                }
                else if(ram.memory_type=='DDR5'){
                    query+=`AND memory_type IN ('DDR5', 'DDR4/DDR5') `;
                }
            }
        }
        query+=`AND category='CPU';`;

        const result =  await pool.query(query);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'could not fetch the parts'});
        console.log(err);
    }

}

const compatibleMotherboard = async (req,res) => {

    try{
        const {selectedComponent} = req.body;

        let query = `SELECT * FROM components where 1=1 `;

        if(selectedComponent&&selectedComponent.length!=0){

            const cpu = selectedComponent.find(c => c.category === 'CPU');

            if(cpu){
                query+=`AND socket_type='${cpu.socket_type}' `;
            }

            const ram = selectedComponent.find(c => c.category === 'RAM');

            if(ram){

                if(ram.memory_type=='DDR3'){
                    query+=`AND memory_type IN ('DDR3', 'DDR3/DDR4', 'DDR3/DDR4/DDR5') `;
                }
                else if(ram.memory_type=='DDR4'){
                    query+=`AND memory_type IN ('DDR4', 'DDR4/DDR5') `;
                }
                else if(ram.memory_type=='DDR5'){
                    query+=`AND memory_type IN ('DDR5', 'DDR4/DDR5') `;
                }
            }
        }
        query+=`AND category='Motherboard';`;

        const result =  await pool.query(query);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'could not fetch the parts'});
        console.log(err);
    }

}

const compatibleRAM = async (req,res) => {

    try{
        const {selectedComponent} = req.body;

        let query = `SELECT * FROM components where 1=1 `;

        if(selectedComponent&&selectedComponent.length!=0){

            const cpu = selectedComponent.find(c => c.category === 'CPU');

            if(cpu){

                if(cpu.memory_type=='DDR3/DDR4'){
                    query+=`AND memory_type IN ('DDR3','DDR4') `;
                }
                else if(cpu.memory_type=='DDR4/DDR5'){
                    query+=`AND memory_type IN ('DDR4','DDR5') `;
                }
                else if(cpu.memory_type=='DDR3'){
                    query+=`AND memory_type IN ('DDR3') `;
                }
                else if(cpu.memory_type=='DDR4'){
                    query+=`AND memory_type IN ('DDR4') `;
                }
                else if(cpu.memory_type=='DDR5'){
                    query+=`AND memory_type IN ('DDR5') `;
                }

            }

            const motherboard = selectedComponent.find(c => c.category === 'Motherboard');

            if(motherboard){

                if(motherboard.memory_type=='DDR3/DDR4'){
                    query+=`AND memory_type IN ('DDR3','DDR4') `;
                }
                else if(motherboard.memory_type=='DDR4/DDR5'){
                    query+=`AND memory_type IN ('DDR4','DDR5') `;
                }
                else if(motherboard.memory_type=='DDR3'){
                    query+=`AND memory_type IN ('DDR3') `;
                }
                else if(motherboard.memory_type=='DDR4'){
                    query+=`AND memory_type IN ('DDR4') `;
                }
                else if(motherboard.memory_type=='DDR5'){
                    query+=`AND memory_type IN ('DDR5') `;
                }
            }
        }
        query+=`AND category='RAM';`;


        const result =  await pool.query(query);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'could not fetch the parts'});
        console.log(err);
    }

}
const compatibleGPU = async (req,res) => {

    try{
        const {selectedComponent} = req.body;

        let query = `SELECT * FROM components where 1=1 `;

        if(selectedComponent&&selectedComponent.length!=0){

            const pcCase = selectedComponent.find(c => c.category === 'Case');

            if(pcCase){
                if(pcCase.size=='Micro-ATX'){
                    query+=`size IN ('E-ATX','ATX','Micro-ATX') `;
                }
                else if(pcCase.size=='ATX'){
                    query+=`size IN ('E-ATX','ATX') `;
                }
                else if(pcCase.size=='ATX'){
                    query+=`size IN ('E-ATX') `;
                }

            }

            
        }
        query+=`AND category='Case';`;


        const result =  await pool.query(query);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error: 'could not fetch the parts'});
        console.log(err);
    }

}


module.exports = {
    getAllcomponent, compatibleCpu, compatibleMotherboard, compatibleRAM, compatibleGPU
}