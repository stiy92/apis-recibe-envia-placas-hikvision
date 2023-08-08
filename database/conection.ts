
const con = require('../classes/Config');


//este registro a otra base de datos lo debo de revisar
//const con2 = require('../classes/Config2');
//------------------------------------------------

const sqll = require('mssql');


// ===================================metodo para veriicar la conection a db===============================================
const pool = new sqll.ConnectionPool(con)
async function getconectado() {

    try{
        pool.connect(); 
            console.log('conecion exitosa a la base de datos CCARGA');
        
    }catch(err) {
            console.log(err);
        }
    
}
//====================================fin metodo para veriicar la conection a db============================================================


// =============================================metodo registro de placas camara basculas CCARGA =============================
async function agregarCamara(placa:any, fecha:any){
   
    var filtro = /^[A-Z]{3}[0-9]{3}$/;
    let canti = placa.length;

    // condicion con exprecion regular para validar si el tipo de placa cumple con las caracteristicas de ser 6 careacteres y tener tres letras iniciales y 3 numeros finales
    if( canti == 6 && filtro.test(placa) ){

        let query = "UPDATE dbo.bscla SET ba_plca_extrna= '"+placa+"', ba_fcha_dtos_extrnos = getdate() WHERE ba_cdgo = 'BC_OPP8'";
        let pool = await sqll.connect(con);
        await pool.request().query(query, function(err:any,result:any,filed:any){
            if (err) throw err
            //console.log(result);
            
            console.log('placa enviada :'+" "+placa);
            // console.log(placa);
            pool.close();
  
        })
// ==========================================================DB CAMARA=========================================================================
        let query2 = "insert into anpr_ca.dbo.camara (ba_cdgo, ba_plca_extrna, ba_fcha_dtos_extrnos, ip_bc) values ('BC_OPP8', '"+placa+"', getdate(), '172.30.92.44')";
        let pool2 = await sqll.connect(con);
        await pool2.request().query(query2, function(err:any,result:any,filed:any){
            if (err) throw err
            //console.log(result);

            console.log('Registrada desde BCZl_SALIDAD');
            console.log('fecha y hora :'+" "+fecha);
            pool2.close();
            sqll.close(); 
        })

    }
    else{
        console.log('PLACA NO ENVIADA NO CUMPLE LAS REGLAS' + ":" + " " + placa);
    }

}

//==========================================fin metodo registro de placas camara basculas PANTERA========================================



//=============================================exportando metodos=======================================================
module.exports = {

    getconectado,
    agregarCamara,

}

//============================================fin exportando metodos=======================================================================

// =====================================================expreciones regulares============================================================
//  var expregg =/^[A-Z]{3}[0-9]{3}$/
// // var expreg = new RegExp("^[A-Z]{3}[0-9]{3}$");
//=====================================================fin expreciones regulares==========================================================


