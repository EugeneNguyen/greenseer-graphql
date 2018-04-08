# greenseer-graphql

Greenseer is a collection of auto generate code, which support developer to generate their code quicker and smarter.


## Installing
### Installing greenseer-graphql

```
npm install -g greenseer-graphql
```

or 

```
yarn global add greenseer-graphql
```

### Go to your project folder

```
greenseer-graphql init
```

### Check your connection

```
greenseer-graphql env check
```

### Generate model file

In case of you want to print only
```
gsg generate model your_table_name
```

In case of you want to generate file
```
gsg generate model your_table_name -o
```

### Generate all model file

Add models to to config, you can input several index by putting it in comma separated
```
gsg model add
```

and generate now

```
gsg generate model -a
```