# Nest Hacks

1. By default, one instance of provider is used inside the nest module independent of how many times it is injected inside the same module providers and controllers
    - To change this behavious we have injection scopes i.e, https://betterprogramming.pub/a-deep-dive-into-nestjs-injection-scope-d45e87fd918d
2. For Two separate modules(even if they are parent-children), if we provide the same provider insider *providers* property then two separate instance of provider will be created
    - If you want to avoid this behaviour, then always import the module of that provider which is exporting that provider in *exports* property
3. Modules are only initialized once in Nest-js independent of how many times they are imported in nest application