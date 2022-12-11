### Quickstart

To see day results (starting from year 2022):

```bash
npx ts-node 2022/01
```

To test day results:

```bash
npx jest 2022/01 --watch
```

Calculating lines of code in solution:

```bash
find 2022/02 -name '*.ts' -not -name '*.spec.ts' -print0 | xargs -0 wc -l
```
