import 'dart:async';

import 'package:flutter/material.dart';
import 'package:job_scrapper/fetch_jobs.dart';
import 'package:job_scrapper/job.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Job Application',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Job Application'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List<Job>> futureJob;

  @override
  void initState() {
    super.initState();
    futureJob = fetchJobs();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text(widget.title),
      ),
      body: Center(
        child: FutureBuilder<List<Job>>(
          future: futureJob,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return RefreshIndicator(
                child: ListView.separated(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(snapshot.data![index].title),
                      subtitle: Text(
                          "${snapshot.data![index].company}\n${snapshot.data![index].location}"),
                    );
                  },
                  separatorBuilder: (context, index) =>
                      const Divider(height: 0),
                ),
                onRefresh: () async {
                  final list = fetchJobs();
                  setState(() {
                    futureJob = list;
                  });
                },
              );
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            }
            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
