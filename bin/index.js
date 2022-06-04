const Commander = require('commander');
const { seedUsers, listUsers, dropUsers, updateUser, deleteUser } = require('./db-commands');

const currentVersion = '0.0.1';

const program = new Commander.Command();
program.version(currentVersion);


program
  .command('list <model>')
  .description('Lists all the <model> entries from database.')
  .option('-e, --extras', 'Displays all extra information of the documents.')
  .action(listAction);

program
  .command('find <model> <model_id> <update_body>')
  .description('Find and prints the details of <model> with id of <model_id> and <update_body> with JSON string')
  .action(findAction);

program
  .command('update <model> <model_id>')
  .description('Updates the <model_id> with ')
  .action(updateAction);


program
  .command('drop <model>')
  .description('Drops the <model> deleting all documents in it.')
  .action(dropAction);

program
  .command('delete <model> <model_id>')
  .description('Delete a model with id of <model_id>')
  .action(deleteAction);


program
  .command('seed <model>')
  .description('Seeds <model> entries with some default entries after dropping previous in database.')
  .action(seedAction);

program
  .option('-v, --version', 'Displays the CLI Version.')
  .option('-d, --debug', 'Outputs extra debugging');

const options = program.opts();
program.parse(process.argv);

if(options.debug) console.log(options);
if(options.version) console.log(currentVersion);


// FIXME: sub-command options ?? 
async function listAction(model){ 
  if(model === 'users') {
    console.log("listing users...!");
    var allUsers;
    if(!options.extras)
      allUsers = await listUsers();
    else
      console.log('Extras not available yet!');

    console.table(allUsers);
  } else {
    console.log("Available models, - users");
  }
  process.exit(1);
}


// async function updateAction(model, model_id, update_body){
//   if(model === 'users') {
//     console.log("Updating user(s)..");

//     console.log(model, model_id);

//     if(model_id === 'all') {
//       const allUsers = await listUsers();
//       for(let i = 0; i < allUsers.length; i++){
//         await updateUser(allUsers[i], JSON.parse(update_body));
//       }
//       console.log("Updating users successfull!");
//     }


//   } else {
//     console.log("Available models, - users");    
//   }
//   process.exit(1);  
// }


async function seedAction(model){
  if(model === 'users') {
    console.log("resetting and seeding database....");
    await seedUsers();
    await listAction(model);
  } else {
    console.log("Available models, - users");    
  }
  process.exit(1);
}


function findAction(model, modelId){
  console.log(`${model}: ${modelId}`);
}


async function dropAction(model){
  if(model === 'users') {
    console.log("dropping users...");
    await dropUsers();
  } else {
    console.log("Available models, - users");
  }
  process.exit(1);
}


async function deleteAction(model, id){
  if(model === 'users') {
    await deleteUser(id);
  } else {
    console.log("Available models, - users");
  }
  process.exit(1);
}

