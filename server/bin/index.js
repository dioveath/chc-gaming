const Commander = require('commander');
const { seedUsers, listUsers, dropUsers, deleteUser } = require('./db-commands');

const currentVersion = '0.0.1';

const program = new Commander.Command();
program.version(currentVersion);


program
  .command('list <model>')
  .description('Lists all the <model> entries from database.')
  .option('-e, --extras', 'Displays all extra information of the documents.')
  .action(listAction);

program
  .command('find <model> <model_id>')
  .description('Find and prints the details of <model> with id of <model_id>')
  .action(findAction);

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

